# Kubernetes HPA & VPA Implementation

This project demonstrates the implementation of **Horizontal Pod Autoscaler (HPA)** and **Vertical Pod Autoscaler (VPA)** on an AWS EKS cluster to optimize resource usage and handle traffic spikes automatically.

## 🚀 Overview

- **HPA**: Scales the number of pods based on CPU utilization.
- **VPA**: Automatically adjusts the CPU and memory requests/limits of pods.
- **PDB**: Ensures high availability by preventing too many pods from being taken down simultaneously during scaling or maintenance.
- **CI/CD**: Automated deployment via GitHub Actions.

## 📂 Project Structure

```text
.
├── .github/workflows/
│   └── deploy.yaml       # GitHub Actions CI/CD pipeline
├── k8s/
│   ├── deployment.yaml   # App deployment with resource requests/limits
│   ├── hpa.yaml          # Horizontal Pod Autoscaler configuration
│   ├── vpa.yaml          # Vertical Pod Autoscaler configuration
│   └── pdb.yaml          # Pod Disruption Budget
└── README.md
```

## 🛠️ Installation & Setup

### 1. Prerequisites (Run once on cluster)
Before applying the manifests, you must install the Metrics Server and VPA:

**Install Metrics Server:**
```bash
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

**Install VPA:**
```bash
git clone https://github.com/kubernetes/autoscaler.git
cd autoscaler/cluster-autoscaler/vpa
./hack/vpa-up.sh
```

### 2. Local Deployment
If you want to deploy manually:
```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/hpa.yaml
kubectl apply -f k8s/vpa.yaml
kubectl apply -f k8s/pdb.yaml
```

## 🤖 CI/CD Pipeline (GitHub Actions)

The project is configured to deploy automatically to AWS EKS. To enable this, add the following secrets to your GitHub repository:

- `AWS_ACCESS_KEY_ID`: Your AWS IAM Access Key
- `AWS_SECRET_ACCESS_KEY`: Your AWS IAM Secret Key
- `AWS_REGION`: e.g., `us-east-1`
- `EKS_CLUSTER_NAME`: The name of your EKS cluster

## 🧪 Testing & Verification

### Verify HPA
Watch the replicas scale in real-time:
```bash
kubectl get hpa myapp-hpa -w
```

### Verify VPA
Check the resource recommendations:
```bash
kubectl describe vpa myapp-vpa
```

### Load Testing
Generate traffic to trigger HPA using `hey`:
```bash
hey -n 10000 -c 100 http://<your-service-url>
```
