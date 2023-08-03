
//!Case
//Todo router.post('/createcase', requestUser)
/**
 * @swagger
 * components:
 *   schemas:
 *     Case:
 *       type: object
 *       properties:
 *         caseId:
 *           type: string
 *         reporter:
 *           type: string
 *         problem:
 *           type: string
 *         problemDetail:
 *           type: string
 *         detail:
 *           type: string
 *         campgame:
 *           type: string
 *         wallet:
 *           type: string
 *         editors:
 *           type: string
 *         recorder:
 *           type: string
 *         status:
 *           type: string
 *         closeCaseBy:
 *           type: string
 */
/**
 * @swagger
 * /api/createcase:
 *   post:
 *     summary: Create a new case
 *     description: Create a new case with the given information.
 *     tags: [Cases]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reporter:
 *                 type: string
 *               problemDetail:
 *                 type: string
 *               problem:
 *                 type: string
 *               detail:
 *                 type: string
 *               campgame:
 *                 type: string
 *               wallet:
 *                 type: string
 *               recorder:
 *                 type: string
 *     responses:
 *       200:
 *         description: Case created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 cases:
 *                   $ref: '#/components/schemas/Case'
 *       500:
 *         description: Internal server error. Failed to create the case.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

//todo //เรียกดูเคสทั้งหมด router.get('/listcase', allCase)
/**
 * @swagger
 *  /api/listcase:
 *   get:
 *     tags: [Cases]
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: get allCase.
 */


 
//todo // เรียกดูเคส 1 เคส router.get('/findcase/:id', findCase)
/**
 * @swagger
 *  /findcase/:id:
 *   get:
 *     tags: [Cases]
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
*/


//todo // update case router.put('/change-detail/:id', updateDetail)
/**
 * @swagger
 *  /change-detail/:id:
 *   put:
 *     tags: [Cases]
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               detail:
 *                 type: string
 *              
 *     responses:
 *       200:
 *         description: Case detail updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 reporter:
 *                   type: string
 *                 problem:
 *                   type: string
 *                 problemDetail:
 *                   type: string
 *                 detail:
 *                   type: string
 *                 campgame:
 *                   type: string
 *                 wallet:
 *                   type: string
 *                 editors:
 *                   type: string
 *                 recorder:
 *                   type: string
 *                 status:
 *                   type: string
 *                 closeCaseBy:
 *                   type: string
 *       500:
 *         description: Internal server error. Failed to create the case.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */


//todo router.post('/create-detailcase', createDetailCase2)

/**
 * @swagger
 * components:
 *   schemas:
 *     DataDetail:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *           properties:
 *             type:
 *               type: object
 *               properties:
 *                 types:
 *                   type: string
 *                 name:
 *                   type: string
 *             detail:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *       required:
 *         - data
 */
/**
 * @swagger
 * /api/create-detailcase:
 *   post:
 *     summary: Create a new data detail case
 *     description: Create a new data detail case with the given information.
 *     tags: [DetailListCase]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: object
 *                     properties:
 *                       types:
 *                         type: string
 *                       name:
 *                         type: string
 *                   detail:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *             required:
 *               - data
 *     responses:
 *       201:
 *         description: Data created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 newData:
 *                   $ref: '#/components/schemas/DataDetail'
 *       400:
 *         description: Name already exists. Data detail already exists in the database.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error. Failed to create data detail.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */


//!Register
//todo create register
/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *         enabled:
 *           type: boolean
 *         _id:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the given information.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/Users'
 *       400:
 *         description: Bad request. User already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error. Failed to register user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

//Todo Login
/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: User login with username and password.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 payLoad:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         username:
 *                           type: string
 *                         role:
 *                           type: string
 *                         id:
 *                           type: string
 *       400:
 *         description: Bad request. User not found or invalid credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       401:
 *         description: Unauthorized. Invalid password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error. Failed to login user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

//Todo 

/**
 * @swagger
 * /api/current-user:
 *   post:
 *     summary: Get current user information
 *     description: Get information of the currently logged-in user.
 *     tags: [Authentication]
 *     security:
 *       - jwtAuth: []
 *     responses:
 *       200:
 *         description: Get current user successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 role:
 *                   type: string
 *                 id:
 *                   type: string
 *       401:
 *         description: Unauthorized. Invalid or missing token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error. Failed to get current user information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

//todo

/**
 * @swagger
 * /api/authen:
 *   post:
 *     summary: User authentication
 *     description: Authenticate user with JWT token.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               authtoken:
 *                 type: string
 *             required:
 *               - authtoken
 *     responses:
 *       200:
 *         description: User authenticated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                     role:
 *                       type: string
 *                     id:
 *                       type: string
 *       400:
 *         description: Bad request. Token is missing.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       401:
 *         description: Unauthorized. Invalid or expired token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error. Failed to authenticate user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */


//todo delete user
/**
 * @swagger
 * /api/remove-user/{id}:
 *   delete:
 *     summary: Remove user
 *     description: Remove a user with the given ID.
 *     tags: [User]
 *     security:
 *       - jwtAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to remove.
 *     responses:
 *       200:
 *         description: User removed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request. Invalid or missing ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       401:
 *         description: Unauthorized. Missing or invalid token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error. Failed to remove user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */


/**
 * @swagger
 * /api/updatePassword:
 *   put:
 *     summary: Update user password
 *     description: Update user password in the database.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               values:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   password:
 *                     type: string
 *     responses:
 *       200:
 *         description: User password updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 role:
 *                   type: string
 *                 enabled:
 *                   type: boolean
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *       400:
 *         description: Bad request. Invalid data provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error. Failed to update user password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
exports.updatePassword = async (req, res) => {
    // ... your existing code ...
  };
  