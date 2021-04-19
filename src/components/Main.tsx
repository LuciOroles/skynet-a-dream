import React, { ReactElement, useEffect, useState } from 'react';
import useUserList, { SiaUser } from '../context/useUserList';
const endpoint = process.env.REACT_APP_USERS as string;
const endpoint1 = process.env.REACT_APP_USERS1 as string;

export default function Main(): ReactElement {
  const [siaUsers, setSiaUser] = useState<SiaUser[]>([]);
  const { data, error, loading } = useUserList(endpoint1);

  useEffect(() => {
    if (data) {
      setSiaUser(data.siaUsers);
    }
  }, [data]);

  if (loading) return <div>Loading ...</div>;
  if (error) return <div>Some error occured!</div>;
  return (
    <div>
      <h3>Main view</h3>
      {siaUsers.map((user, i) => {
        return <div key={i}>{user.id}</div>;
      })}
    </div>
  );
}
