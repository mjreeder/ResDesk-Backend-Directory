module.exports = {
  connection: 'directoryServer',
  tableName: 'student',
  attributes: {
    bsu_id:{
      type: 'integer'
    },
    entry_name:{
      type: 'string'
    },
    name_last:{
      type: 'string'
    },
    name_first:{
      type: 'string'
    },
    name_preferred:{
      type: 'string'
    },
    room_space_description:{
      type:'string'
    },
    phone_mobile_cell:{
      type:'integer'
    },
    email:{
      type: 'string'
    },
    position:{
      type:'string'
    },
    term_detail:{
      type:'string'
    },
    position_date_start:{
      type:'date'
    },
    position_date_end:{
      type: 'date'
    }
  }
};
