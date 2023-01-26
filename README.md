## Reproduce repo for registry & tcp transport in docker

#### Run:
```bash
docker compose up --build --scale broker=2
```

#### Stop:
```bash
docker compose down ---rmi all
```