const DEV_DOMIN = '';
const PROD_DOMIN = '';

const currentDomin = DEV_DOMIN;

const APIV1 = currentDomin + '/api';

module.exports = {
  YQL: [],
  CORS: [PROD_DOMIN, DEV_DOMIN],
  api_domin: currentDomin,
  api: {

  }
};
