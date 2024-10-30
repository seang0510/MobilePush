const helper = require('../helper/helper');

//사용자 조회
exports.getUser = async(userGuid, email, joinTypeCode, deviceTypeCode) => {
    // let user = null;

    // try {        
    //     const [rows, fields] = await pool.query('CALL SYS_USER_MST_SELECT(?,?,?,?,?)', [userGuid, email, joinTypeCode, deviceTypeCode, 'N']);
        
    //     if(rows[0].length > 0){
    //         user = rows[0].length == 0 ? null : rows[0][0];
    //         console.log("조회 성공");
    //     }
    //     else{
    //         console.log("조회 실패");
    //     }
    //     return user;
    // } catch (err) {
    //     console.log(err);
    //     throw Error(err);
    // }
};
