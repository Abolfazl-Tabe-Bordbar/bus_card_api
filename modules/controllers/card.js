const DataBase = require("./../database/schema");
const { connection_database_status } = require("./../database/connection");


class cards extends DataBase {

    async get_charge(req, res) {
        try {
            if (connection_database_status != false) {

                let select_card = await this.models.cards.findOne({
                    where: {
                        code: parseInt(req.params.card_id)
                    }
                });

                if (select_card != null) {
                    res.json({
                        status: true,
                        card_charge: select_card.dataValues.charge
                    });
                } else {
                    res.json({
                        status: false,
                        message: "شماره کارت اشتباه می باشد"
                    });
                }



            } else {
                throw new Error('خطا در اتصال به پایگاه داده');
            }
        } catch (error) {
            res.json({
                status: false,
                message: 'خطای غیرمنتظره'
            });
        }
    }

    async create_card(req, res) {
        try {
            if (connection_database_status != false) {

                if (!req.body.card_code || req.body.card_code.length < 6 || req.body.card_code.length > 6) {
                    res.json({
                        status: false,
                        message: "اطلاعات ارسالی دارای اعتبار لازم نمی باشد"
                    });
                } else {

                    let select_card = await this.models.cards.findOne({
                        where: {
                            code: req.body.card_code
                        }
                    });

                    if (select_card != null) {
                        res.json({
                            status: false,
                            message: "چنین کارتی وجود دارد"
                        });
                    } else {
                        let create_card = await this.models.cards.create({
                            code: parseInt(req.body.card_code),
                            charge: 0,
                        });

                        if (create_card.dataValues.id > 0) {
                            res.json({
                                status: true,
                                message: "کارت با موفقیت ایجاد شد"
                            });
                        } else {
                            res.json({
                                status: false,
                                message: "خطا در ایجاد کارت جدید"
                            });
                        }
                    }

                }


            } else {
                throw new Error('خطا در اتصال به پایگاه داده');
            }
        } catch (error) {
            console.log(error);
            res.json({
                status: false,
                message: 'خطای غیرمنتظره'
            });
        }
    }

    async plus_charge(req, res) {
        try {
            if (connection_database_status != false) {
                
                console.log(req.body);
                if (!req.params.card_id || !req.body.charge) {
                    res.json({
                        status: false,
                        message: "اطلاعات ارسالی دارای اعتبار لازم نمی باشد"
                    });
                } else {

                    let select_card = await this.models.cards.findOne({
                        where: {
                            code: parseInt(req.params.card_id)
                        }
                    });

                    if (select_card == null) {
                        res.json({
                            status: false,
                            message: "چنین کارتی وجود ندارد"
                        });
                    } else {
                        console.log((parseInt(select_card.dataValues.charge) + parseInt(req.body.charge)));
                        if ((parseInt(select_card.dataValues.charge) + parseInt(req.body.charge)) >= 30000) {
                            res.json({
                                status: false,
                                message: "مقدار درخواستی برای شارژ بیش از حد مجاز است"
                            });
                        } else {
                            let new_charge = parseInt(select_card.dataValues.charge) + parseInt(req.body.charge);
                            let update = await this.models.cards.update({
                                charge: new_charge,
                            }, {
                                where: {
                                    code: parseInt(req.params.card_id)
                                }
                            });

                            if (update) {
                                res.json({
                                    status: true,
                                    message: "کارت شما با موفقیت شارژ شد",
                                    new_charge
                                });
                            } else {
                                res.json({
                                    status: false,
                                    message: "خطا در انجام عملیات شارژ کردن"
                                });
                            }
                        }
                    }
                }


            } else {
                throw new Error('خطا در اتصال به پایگاه داده');
            }
        } catch (error) {
            console.log(error);
            res.json({
                status: false,
                message: 'خطای غیرمنتظره'
            });
        }
    }

    async max_charge(req, res) {
        try {
            if (connection_database_status != false) {

                let select_card = await this.models.cards.findOne({
                    where: {
                        code: parseInt(req.params.card_id)
                    }
                });

                if (select_card == null) {
                    res.json({
                        status: false,
                        message: "چنین کارتی وجود ندارد"
                    });
                } else {
                    let chargeing = (30000 - parseInt(select_card.dataValues.charge));

                    if (chargeing == 0) {
                        res.json({
                            status: false,
                            message: "کارت شما در بالاترین حد شارژ است"
                        });
                    } else {
                        let update = await this.models.cards.update({
                            charge: 30000,
                        }, {
                            where: {
                                code: parseInt(req.params.card_id)
                            }
                        });

                        if (update) {
                            res.json({
                                status: true,
                                message: "کارت شما با موفقیت شارژ شد",
                                chargeing
                            });
                        } else {
                            res.json({
                                status: false,
                                message: "خطا در انجام عملیات شارژ کردن"
                            });
                        }
                    }
                }


            } else {
                throw new Error('خطا در اتصال به پایگاه داده');
            }
        } catch (error) {
            console.log(error);
            res.json({
                status: false,
                message: 'خطای غیرمنتظره'
            });
        }
    }


}

module.exports = new cards();