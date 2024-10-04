const express = require('express');
const roleController = require('../controllers/roleController');

const roleRouter = express.Router();

roleRouter.post('/admin/add/roles', roleController.addRole); 
roleRouter.get('/admin/roles', roleController.viewRoles); 
roleRouter.put('/admin/update/role/:role_id', roleController.updateRole);
roleRouter.delete('/admin/delete/role/:role_id', roleController.deleteRole);
roleRouter.put('/admin/update/role/status/:role_id', roleController.updateRoleStatus);

 
module.exports = roleRouter;
