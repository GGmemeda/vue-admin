const DEV_DOMIN = 'http://192.168.100.143:900';
const PROD_DOMIN = 'http://192.168.100.143:900';

const currentDomin = DEV_DOMIN;

const APIV1 = currentDomin + '/api';

module.exports = {
  YQL: [],
  CORS: [PROD_DOMIN, DEV_DOMIN],
  api_domin: currentDomin,
  api: {
    DbConfig: `${APIV1}/DbConfig`
  }
};
