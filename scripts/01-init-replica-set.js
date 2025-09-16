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