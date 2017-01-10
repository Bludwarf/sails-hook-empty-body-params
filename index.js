/**
 * emptyBodyParams
 *
 * @description :: Mise à null des paramètres vide "" envoyés par un client dans le body d'un POST ou d'un PUT (à cause d'un INPUT vide dans un FORM par exemple)
 *                 pour éviter des problèmes de validation Waterline (exemple "" n'est pas considéré comme un integer, alors que null est ignoré)
 *                 Exemple d'erreur avec 3 paramètres numériques vides : (E_VALIDATION) :: 3 attributes are invalid
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(sails) {

    return {

        routes: {
            before: {
                '*': function(req, res, next) {
                    _.forEach(req.body, function(bodyParamValue, bodyParamName) {
                        if (bodyParamValue === '') {
                            req.body[bodyParamName] = null;
                            sails.log.verbose("req.body." + bodyParamName + " = \"\" -> null");
                        }
                    });
                    return next();
                }
            }
        }

    };
};