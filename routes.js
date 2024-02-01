const express = require("express")
const employeeTable = require("./models").employee


const router = express.Router();

//Add emp
router.post("/add", (req, res) => {
    // console.log(req.body)
    employeeTable.findOne({
        where: {
            email: req.body.email
        }
    })
        .then((data) => {
            if (data) {
                res.json({
                    status: false,
                    message: "email already present"
                })
            }
            else {
                employeeTable.create(
                    req.body
                ).then((success) => res.json({
                    status: true,
                    message: "successfully emp added"
                })).catch((error) =>
                    res.json({
                        status: true,
                        message: "failed to add emp query"
                    })

                )
            }
        })
        .catch((error) =>
            res.json({
                status: false,
                message: "error in finding employee query"
            })
        )

})


//list all emp
router.get("/listAll", (req, res) => {
    employeeTable.findAll().then((data) => {
        if (data) {
            res.json({
                status: true,
                message: "emp found",
                users: data
            })
        }

        else {
            res.json({
                status: false,
                message: "No employee found"
            })
        }
    }
    ).catch((error) =>
        res.json({
            status: false,
            message: "error in query"
        })

    )
})

//get particular emp
router.get("/getEmp/:empId", (req, res) => {
    employeeTable.findOne({
        where:{
            id:req.params.empId
        }
    }).then((data) => {
        if (data) {
            res.json({
                status: true,
                message: "emp found",
                user: data
            })
        }

        else {
            res.json({
                status: false,
                message: "No employee found"
            })
        }
    }
    ).catch((error) =>
        res.json({
            status: false,
            message: "error in query"
        })

    )
})

//update
router.put("/update/:empId", (req, res) => {
    employeeTable.findOne({
        where:{
            id:req.params.empId
        }
    }).then((data) => {
        if (data) {
            employeeTable.update(
               req.body,{
                where:{
                    id:req.params.empId
                }
               }
            ).then((success) => res.json({
                status: true,
                message: "successfully emp updated"
            })).catch((error) =>
                res.json({
                    status: true,
                    message: "failed to update emp query"
                })

            )
        }

        else {
            res.json({
                status: false,
                message: "No employee found"
            })
        }
    }
    ).catch((error) =>
        res.json({
            status: false,
            message: "error in query"
        })

    )
})

//delete
router.delete("/delete/:empId", (req, res) => {
    employeeTable.findOne({
        where:{
            id:req.params.empId
        }
    }).then((data) => {
        if (data) {
            employeeTable.destroy(
              {
                where:{
                    id:req.params.empId
                }
               }
            ).then((success) => res.json({
                status: true,
                message: "successfully emp deleted"
            })).catch((error) =>
                res.json({
                    status: true,
                    message: "failed to delete emp query"
                })

            )
        }

        else {
            res.json({
                status: false,
                message: "No employee found"
            })
        }
    }
    ).catch((error) =>
        res.json({
            status: false,
            message: "error in query"
        })

    )
})



//wlcm page
router.get("/", (req, res) => {
    res.json({
        status: true,
        message: "Welcome to node"
    })
})


module.exports = router