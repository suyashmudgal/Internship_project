import requests
import json
import sys

BASE_URL = "http://127.0.0.1:8000"

results = []

def record(name, passed, details):
    results.append({"name": name, "passed": passed, "details": details})
    status = "PASS" if passed else "FAIL"
    print(f"[{status}] {name}: {details}")

# 1. Health check
try:
    r = requests.get(f"{BASE_URL}/health", timeout=5)
    passed = r.status_code == 200 and r.json() == {"status": "ok"}
    record("Health Check", passed, f"Status: {r.status_code}, Body: {r.text}")
except Exception as e:
    record("Health Check", False, str(e))

# 2. Sample Query 1: Machine learning types
try:
    payload = {"query": "What are the main types of machine learning?", "top_k": 3}
    r = requests.post(f"{BASE_URL}/query", json=payload, timeout=30)
    data = r.json()
    is_list = isinstance(data, list)
    keys_correct = all(set(item.keys()) == {"chunk_text", "page_number", "score"} for item in data)
    top_page = data[0]["page_number"] if data else None
    passed = r.status_code == 200 and is_list and keys_correct and top_page == 1
    record("Query 1 (ML Types)", passed, f"Status: {r.status_code}, Top Page: {top_page}, Items: {len(data)}, Score: {data[0]['score']}")
except Exception as e:
    record("Query 1 (ML Types)", False, str(e))

# 3. Sample Query 2: Transformer models in NLP
try:
    payload = {"query": "How do transformer models work in NLP?", "top_k": 3}
    r = requests.post(f"{BASE_URL}/query", json=payload, timeout=30)
    data = r.json()
    is_list = isinstance(data, list)
    keys_correct = all(set(item.keys()) == {"chunk_text", "page_number", "score"} for item in data)
    top_page = data[0]["page_number"] if data else None
    passed = r.status_code == 200 and is_list and keys_correct and top_page == 2
    record("Query 2 (NLP Transformers)", passed, f"Status: {r.status_code}, Top Page: {top_page}, Items: {len(data)}, Score: {data[0]['score']}")
except Exception as e:
    record("Query 2 (NLP Transformers)", False, str(e))

# 4. Sample Query 3: Computer Vision & CNNs
try:
    payload = {"query": "What are convolutional neural networks used for?", "top_k": 3}
    r = requests.post(f"{BASE_URL}/query", json=payload, timeout=10)
    data = r.json()
    is_list = isinstance(data, list)
    keys_correct = all(set(item.keys()) == {"chunk_text", "page_number", "score"} for item in data)
    top_page = data[0]["page_number"] if data else None
    passed = r.status_code == 200 and is_list and keys_correct and top_page == 3
    record("Query 3 (CNNs in CV)", passed, f"Status: {r.status_code}, Top Page: {top_page}, Items: {len(data)}, Score: {data[0]['score']}")
except Exception as e:
    record("Query 3 (CNNs in CV)", False, str(e))

# 5. Edge case: Empty query string
try:
    r = requests.post(f"{BASE_URL}/query", json={"query": "", "top_k": 5}, timeout=5)
    passed = r.status_code == 422
    record("Edge Case: Empty query string", passed, f"Status: {r.status_code}")
except Exception as e:
    record("Edge Case: Empty query string", False, str(e))

# 6. Edge case: Missing query field
try:
    r = requests.post(f"{BASE_URL}/query", json={"top_k": 5}, timeout=5)
    passed = r.status_code == 422
    record("Edge Case: Missing query field", passed, f"Status: {r.status_code}")
except Exception as e:
    record("Edge Case: Missing query field", False, str(e))

# 7. Edge case: top_k = 0
try:
    r = requests.post(f"{BASE_URL}/query", json={"query": "test", "top_k": 0}, timeout=5)
    passed = r.status_code == 422
    record("Edge Case: top_k = 0", passed, f"Status: {r.status_code}")
except Exception as e:
    record("Edge Case: top_k = 0", False, str(e))

# 8. Edge case: top_k = -1
try:
    r = requests.post(f"{BASE_URL}/query", json={"query": "test", "top_k": -1}, timeout=5)
    passed = r.status_code == 422
    record("Edge Case: top_k = -1", passed, f"Status: {r.status_code}")
except Exception as e:
    record("Edge Case: top_k = -1", False, str(e))

# 9. Edge case: top_k = 500 (> 100)
try:
    r = requests.post(f"{BASE_URL}/query", json={"query": "test", "top_k": 500}, timeout=5)
    passed = r.status_code == 422
    record("Edge Case: top_k = 500 (> 100)", passed, f"Status: {r.status_code}")
except Exception as e:
    record("Edge Case: top_k = 500 (> 100)", False, str(e))

# 10. Default top_k (omitted top_k)
try:
    r = requests.post(f"{BASE_URL}/query", json={"query": "machine learning"}, timeout=5)
    data = r.json()
    passed = r.status_code == 200 and isinstance(data, list) and len(data) <= 5
    record("Default top_k (omitted)", passed, f"Status: {r.status_code}, Returned count: {len(data)}")
except Exception as e:
    record("Default top_k (omitted)", False, str(e))

# Summary
total = len(results)
passed_count = sum(1 for r in results if r["passed"])
print(f"\nTOTAL: {passed_count}/{total} PASSED")

with open("results.json", "w") as f:
    json.dump(results, f, indent=2)

if passed_count != total:
    sys.exit(1)
