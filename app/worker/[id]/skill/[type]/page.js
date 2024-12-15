import React from 'react';
import SkilledWorkersByTypeView from "../../../../../components/SkilledWorkersByTypeView";

export default async function Dashboard({ params }) {
  const workerType = params?.type || '';
  const id = params?.id || '';

  return <SkilledWorkersByTypeView workerType={workerType} id={id}/>;
}
