export function appKey<
  Key extends string,
  Prefix extends string = typeof appKey.defaultSuffix,
>(key: Key, prefix: Prefix = appKey.defaultSuffix as Prefix) {
  return `${prefix}:${key}` as const;
}

appKey.defaultSuffix = 'br-gen' as const;
