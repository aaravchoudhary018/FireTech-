#!/bin/zsh
cd -- "${0:A:h}"
if curl --silent --fail http://127.0.0.1:8000/api/state >/dev/null; then
  open http://127.0.0.1:8000
else
  (sleep 1; open http://127.0.0.1:8000) &
  echo 'Routekind is starting. Keep this window open while using the app.'
  python3 app.py
fi
