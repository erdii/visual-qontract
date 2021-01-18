import * as React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Table } from 'patternfly-react';
import EscalationPolicies from './elements/EscalationPolicies.js'
import Page from '../components/Page';

const GET_APPESCALATIONPOLICY = gql`
  query EscalationPolicies($path: String) {
    escalation_policies_1(path: $path) {
      name
      path
      description
      channels {
        slackUserGroup {
          handle
        }
        email
        pagerduty {
          escalationPolicyID
        }
        nextEscalationPolicy {
          name
        }
      }

    }
  }
`;

const GET_APPESCALATIONPOLICIES = gql`
  query AppEscalationPolicies {
    apps_v1 {
      name
      escalationPolicy {
        name
        path
      }
    }
  }
`;

const EscalationPoliciesPage = ({ location }) => {
  const path = location.hash.substring(1);

  if (path) {
    return (
      <Query query={GET_APPESCALATIONPOLICY} variables={{ path }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return <Page title="Escalation policy details" body={(
            <pre>
              {JSON.stringify(data.escalation_policies_1, null, 2)}
            </pre>
          )} />;
        }}
      </Query>
    );
  }

  return (
    <Query query={GET_APPESCALATIONPOLICIES}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        return <Page title="Escalation policies" body={(
          <EscalationPolicies apps={data.apps_v1} />
        )} />
      }}
    </Query>
  );
};

export default EscalationPoliciesPage;
