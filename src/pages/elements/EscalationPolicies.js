import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'patternfly-react';
import { sortByName } from '../../components/Utils';
import TableSearch from '../../components/TableSearch';

export default function EscalationPolicies(props) {
    const headerFormat = value => <Table.Heading>{value}</Table.Heading>;
    const cellFormat = value => <Table.Cell>{value}</Table.Cell>;

    const [filterText, changeFilterText] = useState('');
    const options = ['Name'];
    const [selected, changeSelected] = useState(options[0]);
    // const lcFilter = filterText.toLowerCase();

    const processedApps = sortByName(props.apps.slice());

    // TODO: readd filtering
    // function matches(u) {
    //   return (
    //     (selected === 'Name' && u.name.toLowerCase().includes(lcFilter)) ||
    //     (selected === 'Red Hat Username' && u.org_username.toLowerCase().includes(lcFilter)) ||
    //     (selected === 'GitHub Username' && u.github_username.toLowerCase().includes(lcFilter)) ||
    //     (selected === 'Quay Username' && u.quay_username !== null && u.quay_username.toLowerCase().includes(lcFilter))
    //   );
    // }
    // const matchedUsers = processedUsers.filter(matches);

    const columns = [
      {
        header: {
          label: 'Name',
          formatters: [headerFormat]
        },
        cell: {
          formatters: [
            value => value,
            cellFormat
          ]
        },
        property: 'name'
      },
      {
          header: {
              label: 'EscalationPolicy',
              formatters: [headerFormat]
          },
          cell: {
            formatters: [
                value => value == null ? (
                    <span className="escalationpolicy-not-defined">not defined</span>
                ) : (
                    <Link
                        to={{
                            pathname: '/escalationpolicies',
                            hash: value.path
                        }}
                    >
                        {value.name}
                    </Link>
                ),
                cellFormat
            ]
          },
          property: 'escalationPolicy'
      }
    ];
    return (
      <TableSearch
        filterText={filterText}
        changeFilterText={changeFilterText}
        changeSelected={changeSelected}
        options={options}
        selected={selected}
        columns={columns}
        rows={processedApps}
      />
    );
}