import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 100,
  iterations: 10000,
};

export default function () {
  const response = http.get('http://localhost:8080/');

  check(response, {
    'status is 200': (r) => r.status === 200,
  });
}