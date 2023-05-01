/* eslint-disable */
export default {
  displayName: 'services-srv-callrecordings-gcloud-handler',
  preset: '../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory:
    '../../../coverage/apps/services/srv-callrecordings-gcloud-handler',
};
