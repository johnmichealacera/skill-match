import React from 'react';
import UserProfileById from "../../../../components/UserProfileById";

export default async function Dashboard({ params }) {
  const id = params?.id || '';
  
  return <UserProfileById id={id}/>;
}
