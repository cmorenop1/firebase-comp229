let Inventory = require('../models/inventory');
let fs = require('firebase-admin');

function getErrorMessage(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } 
    if (err.message) {
        return err.message;
    } else {
        return 'Unknown server error';
    }
};

exports.list = async function(req, res, next) {

    try {
        // get the firebase instance of firestore
        let db = fs.firestore();

        // get all documents
        let allDocs = await db.collection('inventory').get();

        let docs = [];
        allDocs.docs.map(item => {
            docs.push(item.data());
        })

        res.status(200).json(docs);

    } catch (error) {
        return res.status(400).send({
            success: false,
            message: getErrorMessage(error)
        });
    }
}

// module.exports.displayAddPage = (req, res, next) => {
    
//     let newItem = Inventory();

//     res.render('inventory/add_edit', {
//         title: 'Add a new Item',
//         item: newItem,
//         userName: req.user ? req.user.username : '' 
//     })          
// }

module.exports.processAdd = async (req, res, next) => {
    
    try {
        // get the firebase instance of firestore
        let db = fs.firestore();

        // Generate "locally" a new document in a collection
        let newDocument = db.collection('inventory').doc();

        let newItem = {
            _id: newDocument.id,
            item: req.body.item,
            qty: req.body.qty,
            status: req.body.status,
            size : {
                h: req.body.size.h,
                w: req.body.size.w,
                uom: req.body.size.uom,
            },
            tags: req.body.tags != "" ? req.body.tags.split(",").map(word => word.trim()) : ""
        };

        let response = await newDocument.set(newItem);

        console.log(response);

        return res.status(200).json(newItem)
    
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: getErrorMessage(error)
        });
    }

    
}


// module.exports.displayEditPage = (req, res, next) => {
//     let id = req.params.id;

//     Inventory.findById(id, (err, itemToEdit) => {
//         if(err)
//         {
//             console.log(err);
//             res.end(err);
//         }
//         else
//         {
//             //show the edit view
//             res.render('inventory/add_edit', {
//                 title: 'Edit Item', 
//                 item: itemToEdit,
//                 userName: req.user ? req.user.username : '' 
//             })
//         }
//     });
// }


module.exports.processEdit = async (req, res, next) => {

    try {
        let id = req.params.id

        let updatedItem = {
            _id: id,
            item: req.body.item,
            qty: req.body.qty,
            status: req.body.status,
            size : {
                h: req.body.size.h,
                w: req.body.size.w,
                uom: req.body.size.uom,
            },
            tags: req.body.tags != "" ? req.body.tags.split(",").map(word => word.trim()) : ""
        }

        // get the firebase instance of firestore
        let db = fs.firestore();

        let response = await db.collection('inventory').doc(id).set(updatedItem);

        console.log(response);

        return res.status(200).json(
            { 
            success: true, 
            message: 'Item updated successfully.'
            }
        );
        
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: getErrorMessage(error)
        });
    }
    
}

module.exports.performDelete = async (req, res, next) => {

    try {
        let id = req.params.id;

        // get the firebase instance of firestore
        let db = fs.firestore();

        let response = await db.collection('inventory').doc(id).delete();

        console.log(response);

        return res.status(200).json(
            {
                success: true,
                message: "Item removed successfully."
            }
        );

    } catch (error) {
        return res.status(400).send({
            success: false,
            message: getErrorMessage(error)
        });
    }
    
}
