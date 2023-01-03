git commit -m "Building pages"

git checkout -B github-pages

pnpm run build

rm -rf docs

mv build docs

git add .

git commit -m "Github pages commit"

git push origin HEAD -f

git switch -
