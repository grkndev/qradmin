const snowflake = (() => {
  // Epoch başlangıcı (1 Ocak 2021)
  const epoch: bigint = BigInt(1609459200000);
  let sequence: bigint = BigInt(0);
  let lastTimestamp: bigint = BigInt(0);

  // Makine ve shard ID (özelleştirilebilir)
  const machineId: bigint = BigInt(1) & BigInt(0x1f); // 5 bit (0-31)
  const shardId: bigint = BigInt(1) & BigInt(0x1f); // 5 bit (0-31)

  const getCurrentTimestamp = (): bigint => {
    return BigInt(Date.now());
  };

  const create = (): bigint => {
    let timestamp: bigint = getCurrentTimestamp();

    // Aynı milisaniyede birden fazla ID üretimi
    if (timestamp === lastTimestamp) {
      sequence = (sequence + BigInt(1)) & BigInt(0xfff); // 12 bit (0-4095)
      if (sequence === BigInt(0)) {
        // Aynı milisaniye dolduysa bir sonraki milisaniyeyi bekleyin
        while (timestamp <= lastTimestamp) {
          timestamp = getCurrentTimestamp();
        }
      }
    } else {
      sequence = BigInt(0);
    }

    lastTimestamp = timestamp;

    // 64-bit ID'nin oluşturulması
    return (
      ((timestamp - epoch) << BigInt(22)) |
      (shardId << BigInt(17)) |
      (machineId << BigInt(12)) |
      sequence
    );
  };

  return { create };
})();
export default snowflake;