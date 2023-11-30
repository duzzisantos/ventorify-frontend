const MainWarehouse = require("../models/warehouse");
const BackupWareHouse = require("../models/backup-warehouse");
const changeStream = MainWarehouse.watch();

changeStream.on("change", (change) => {
  if (change.operationType === "insert" || change.operationType === "update") {
    BackupWareHouse.create(change.fullDocument, (err) => {
      if (err) {
        console.error("Error creating backup", err);
      }
    });
  }
});
