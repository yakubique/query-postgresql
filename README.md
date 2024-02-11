# query-postgresql

Make query to PostgreSQL and return JSON

## Usage

For live examples, please see [actions](https://github.com/yakubique/query-postgresql/actions/workflows/test-myself.yaml)

```yaml
uses: yakubique/query-postgresql@v1
with:
  query: |
    select true as result
  host: ${{ env.PG_HOST }}
  port: ${{ env.PG_PORT }}
  username: ${{ env.PG_USER }}
  password: ${{ env.PG_PWD }}
  db: ${{ env.PG_DB }}
  ssl: 'false'
```
