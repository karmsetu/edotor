# How to setup docker for mongo replica set

> If you are using mongodb locally with prisma, you may get an error: Prisma needs to perform transactions, which requires your MongoDB server to be run as a replica set. https://pris.ly/d/mongodb-replica-set   

#### READ [MORE](https://pris.ly/d/mongodb-replica-set)

### here's all you need to do

## create `docker-compose.yml` filr
```yml
version: '3.8'

services:
  mongodb:
    image: mongo:7.0
    container_name: mongodb-replica
    command: ["--replSet", "rs0", "--bind_ip_all"]
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
      - ./scripts:/docker-entrypoint-initdb.d
    healthcheck:
      test: echo 'db.runCommand("ping").ok' | mongosh localhost:27017/test --quiet
      interval: 10s
      timeout: 10s
      retries: 5
      start_period: 40s

volumes:
  mongodb_data:
```

## create `scripts/01-init-replica-set.js`
> make sure that the docker compose file and this folder are on same root

```js
// scripts/01-init-replica-set.js

try {
  rs.status();
} catch (err) {
  print("Replica set not yet initialized. Initializing now...");
  rs.initiate({
    _id: "rs0",
    members: [
      { _id: 0, host: "localhost:27017" }
    ]
  });
  print("Replica set initialized successfully.");
}

print("Waiting for primary...");
while (rs.status().myState !== 1) {
  sleep(1000);
}
print("Replica set is ready!");
```

## run `docker compose up -d`

## check if it's running
```bash
docker-compose logs -f mongodb
```

## update the DATABASE_URL variable in `.env` file 
```.env
DATABASE_URL="mongodb://localhost:27017/your_database_name?replicaSet=rs0"
```

## run PRISMA generator and push DB
```bash
npx prisma db push
npx prisma generate
```

## check how many apps are running on same port(2701)
```bash
netstat -ano | findstr :27017
```

you may get something like:
```bash
  TCP    0.0.0.0:27017          0.0.0.0:0              LISTENING       5344
  TCP    127.0.0.1:27017        0.0.0.0:0              LISTENING       4168
  TCP    127.0.0.1:50392        127.0.0.1:27017        TIME_WAIT       0
  TCP    [::]:27017             [::]:0                 LISTENING       5344
  TCP    [::1]:27017            [::]:0                 LISTENING       6180
```

## find out what are those apps
```bash
tasklist | findstr 5344<the_number_you_got_at_the_end>
```

## remove/stop those apps

- press `win` + `r`
- type `services.msc`
- find those apps, right click and stop

## final check

- goto mongoDB atlas
- new connection `mongodb://localhost:27017/your_database_name?replicaSet=rs0`
> note: ?replicaSet=rs0 is necessary

- connect