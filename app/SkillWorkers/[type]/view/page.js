import React from 'react';
import SkilledWorkersByType from "../../../../components/SkilledWorkersByType";

export default async function Dashboard({ params }) {
  const workerType = params?.type || '';

  return <SkilledWorkersByType workerType={workerType}/>;
}
