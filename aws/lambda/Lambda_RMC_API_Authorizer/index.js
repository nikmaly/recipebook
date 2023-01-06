// Imports
import { CognitoJwtVerifier } from 'aws-jwt-verify';

// Define globals
const awsRegion = 'ap-southeast-2';
const cognitoClientId = '56u2njrnvps7r2dcirvk6otjnl';
const cognitoUserPoolId = 'ap-southeast-2_HtB4MC4cO';
const iss = `https://cognito-idp.${awsRegion}.amazonaws.com/${cognitoUserPoolId}`;
const apiEndpoints = {
	token: 'token',
	jwks: '.well-known/jwks.json',
};

export const handler = async function (event, context, callback) {
	const token = event.authorizationToken;
	let valid = true;

	// Check JWT Token makes sense
	if (token.split('.').length !== 3) {
		callback('Error: Invalid token');
		return context.logStreamName;
	}

	// Verify programmatically
	const accessToken = await jwtTokenVerifier.verify(token);
	// console.log('accessToken:', accessToken);

	// Check Token is not expired
	valid = valid && Date.now() > accessToken.exp;

	// Check audience matches client ID
	valid = valid && cognitoClientId === accessToken.client_id;

	// Check issuer matches user pool ID
	valid = valid && `https://cognito-idp.${awsRegion}.amazonaws.com/${cognitoUserPoolId}` === accessToken.iss;

	// Check the token use claim
	valid = valid && accessToken.token_use === 'access';

	if (valid) {
		callback(null, generatePolicy('user', 'Allow', event.methodArn));
	} else {
		callback('Error: Invalid token');
	}

	// Generate the response
	switch (accessToken.token_use) {
	case 'access':
		callback(null, generatePolicy('user', 'Allow', event.methodArn));
		break;
	case 'deny':
		callback(null, generatePolicy('user', 'Deny', event.methodArn));
		break;
	case 'unauthorized':
		callback('Unauthorized'); // Return a 401 Unauthorized response
		break;
	default:
		callback('Error: Invalid token'); // Return a 500 Invalid token response
	}

	return context.logStreamName;
};

// Verifier that expects valid access tokens:
const jwtTokenVerifier = CognitoJwtVerifier.create({
	userPoolId: cognitoUserPoolId,
	tokenUse: 'access',
	clientId: cognitoClientId,
	jwksUri: `${iss}/${apiEndpoints.jwks}`,
});

// Help function to generate an IAM policy
const generatePolicy = function (principalId, effect, resource) {
	const authResponse = {};

	authResponse.principalId = principalId;
	if (effect && resource) {
		const policyDocument = {};
		policyDocument.Version = '2012-10-17';
		policyDocument.Statement = [];
		const statementOne = {};
		statementOne.Action = 'execute-api:Invoke';
		statementOne.Effect = effect;
		statementOne.Resource = resource;
		policyDocument.Statement[0] = statementOne;
		authResponse.policyDocument = policyDocument;
	}

	// Optional output with custom properties of the String, Number or Boolean type.
	authResponse.context = {
		stringKey: 'stringval',
		numberKey: 123,
		booleanKey: true,
	};

	return authResponse;
};
