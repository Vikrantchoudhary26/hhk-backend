const { default: slugify } = require("slugify");
const GiftBox = require("../../models/GiftBox/GiftModel");

exports.adminCreateGiftBoxCtrl = async (req, res, imageUrls) => {
    try {
        const {
            name,
            description,
            price,
            quantity,
        } = req.body;

        let productImages = [];
        if (imageUrls) {
            if (imageUrls.length > 0) {
                productImages = imageUrls.map(imageUrl => {
                    return { img: imageUrl }
                });
            }
        } else {
            productImages = null
        }

        if (productImages) {

            GiftBox.create({
                name,
                slug: slugify(name),
                description,
                price,
                quantity,
                images: productImages,
                color: req?.body?.color,
                dimesnions: req?.body?.dimensions,
                countryoforigin: req?.body?.countryoforigin,
                material: req?.body?.material,
                trending: req?.body?.trending,
                additionalinfo: req?.body?.additionalinfo,
                tags: req?.body?.tags,
            }).then((giftbox) => {
                return res.status(200).json({
                    giftbox
                })
            })
                .catch(err => {
                    return res.status(500).json({
                        success: false,
                        message: err
                    });
                });
        } else {
            GiftBox.create({
                name,
                slug: slugify(name),
                description,
                price,
                quantity,
                color: req?.body?.color,
                dimesnions: req?.body?.dimensions,
                countryoforigin: req?.body?.countryoforigin,
                material: req?.body?.material,
                trending: req?.body?.trending,
                additionalinfo: req?.body?.additionalinfo,
                tags: req?.body?.tags,
            }).then((giftbox) => {
                return res.status(200).json({
                    giftbox
                })
            })
                .catch(err => {
                    return res.status(500).json({
                        success: false,
                        message: err
                    });
                });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error" + error
        });
    }
}

exports.adminUpdateGiftBoxCtrl = async (req, res, imageUrls) => {
    const {
        gid,
    } = req.body;

    let productImages = [];
    if (imageUrls) {
        if (imageUrls.length > 0) {
            productImages = imageUrls.map(imageUrl => {
                return { img: imageUrl }
            });
        }
    } else {
        productImages = null
    }


    if (productImages) {
        await GiftBox.updateMany({ _id: gid },
            {
                $set:
                {
                    name: req?.body?.name,
                    slug: req?.body?.slug,
                    description: req?.body?.description,
                    price: req?.body?.price,
                    quantity: req?.body?.quantity,
                    countryoforigin: req?.body?.countryoforigin,
                    color: req?.body?.color,
                    additionalinfo: req?.body?.additionalinfo,
                    dimensions: req?.body?.dimensions,
                    trending: req?.body?.trending,
                    images: productImages,
                    material: req?.body?.material,
                    tags: req?.body?.tags,
                }
            }
        ).then((updatedGiftBox) => {
            return res.status(200).json({
                message: "Gift Box Updated"
            })
        })
    } else {
        await GiftBox.updateMany({ _id: gid },
            {
                $set:
                {
                    name: req?.body?.name,
                    slug: req?.body?.slug,
                    description: req?.body?.description,
                    price: req?.body?.price,
                    quantity: req?.body?.quantity,
                    countryoforigin: req?.body?.countryoforigin,
                    color: req?.body?.color,
                    additionalinfo: req?.body?.additionalinfo,
                    dimensions: req?.body?.dimensions,
                    trending: req?.body?.trending,
                    material: req?.body?.material,
                    discountprice: req?.body?.discountprice,
                    tags: req?.body?.tags,
                }
            }
        ).then((updatedGiftBox) => {
            return res.status(200).json({
                message: "GiftBox Updated"
            })
        })
    }
}

exports.adminGetGiftBoxCtrl = async (req, res) => {
    try {
        const {skip } = req.body;
        const giftboxes = await GiftBox.find({}).limit(10).skip(skip*10);
        return res.status(200).json({
            giftboxes,
            totalgiftboxes:giftboxes.length,
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error' + error
        })
    }
}

exports.deleteGiftBoxCtrl = async (req, res) => {
    try {
        const { gid } = req.body;
        await GiftBox.findByIdAndDelete(gid)
        return res.status(200).json({
            message: "GiftBox Deleted Successfully",
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

exports.getAllGiftBoxCtrl = async (req, res) => {
    try {
        const giftboxes = await GiftBox.find({});
        return res.status(200).json({
            giftboxes,
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}


exports.editGiftboxCtrl = async (req, res) => {
    try {
        const { gid } = req.params;
        const updateData = req.body;

        // Check if the provided ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(gid)) {
            return res.status(400).json({
                message: "Invalid product ID format"
            });
        }

        const updatedProduct = await ProductModel.findByIdAndUpdate(
            gid,
            { $set: updateData },
            { new: true }
        ).populate('category');

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        return res.status(200).json({
            product: updatedProduct,
            message: "Product updated successfully"
        });
    } catch (error) {
        console.error("Error in editProductCtrl:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

