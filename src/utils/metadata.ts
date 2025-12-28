import type { Metadata } from 'next';

const createMeta = (meta: Metadata) => meta as Metadata;

export { createMeta, createMeta as createMetaData };
