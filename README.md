Akkurat nå: Sjokktilstand

## Frontend

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Datasamler

```bash
python3 -m venv env
. ./env/bin/activate
pip install -r requirements.txt
while true; do python3 checkShock.py | tee -a dagbladet-sjokk; sleep 10m; done
```