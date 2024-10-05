const User = require("../models/user");
const ExpressError = require("../utils/ExpressError");


module.exports.aboutPage = (req, res, next) => {
    try {
        res.render('about', { title: "UMS - About" });
    } catch (error) {
        next(new ExpressError(500, "Internal server error!"));
    }
}


module.exports.homePage = async (req, res) => {
    try {
        // const allUsers = await User.find({}).limit(10);
        let perpage = 8;
        let page = req.query.page || 1;

        const allUsers = await User.aggregate([{ $sort: { updatedAt: -1 } }])
            .skip(perpage * (page - 1))
            .limit(perpage)
            .exec();
        const count = await User.countDocuments();

        res.render('index',
            {
                allUsers,
                current: page,
                pages: Math.ceil(count / perpage),
                title: "User Management System - Home"
            });

    } catch (error) {
        console.log(error);
    }
}

module.exports.renderNewForm = (req, res, next) => {
    try {
        res.render('user/new', { title: "USM - add new user" });
    } catch (err) {
        next(new ExpressError(404, "Internal server error !"));
    }
}

module.exports.addNewUser = async (req, res) => {
    let userDetails = req.body.user;
    let newUser = new User(userDetails);
    await newUser.save();

    req.flash("success", "New Customer added !");
    return res.redirect('/dashboard');
}

// edit page get route
module.exports.renderEditpage = async (req, res) => {

    const { id } = req.params;
    let user = await User.findById(id);

    if (!user) {
        return res.redirect('/dashboard');
    }

    res.render('user/edit', { user, title: "UMS - Update details" });
}

// update post route
module.exports.updateDetails = async (req, res) => {
    const { id } = req.params;
    let user = await User.findByIdAndUpdate(id, { ...req.body.user });

    user.updatedAt = Date.now();
    await user.save();

    req.flash('success', "Customer details have been updated!");
    res.redirect(`/dashboard/show/${id}`);
}

// delete route:
module.exports.destroyCustomerDetails = async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);

    req.flash('success', "The customer has been successfully deleted.");
    res.redirect('/dashboard');
}

// show page
module.exports.renderShowpage = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    // console.log(user);

    res.render('user/show', { user, title: "USM - user details" });
}

// search post route
module.exports.searchCustomer = async (req, res) => {
    try {
        let searchTerm = req.body.searchTerm;
        const removeSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

        const filterUsers = await User.find(
            {
                $or: [
                    { firstname: { $regex: new RegExp(removeSpecialChar, "i") } },
                    { lastname: { $regex: new RegExp(removeSpecialChar, "i") } },
                ]
            }
        )
        // console.log(filterUsers);
        res.render('search', { filterUsers, title: "UMS - Search user" });

    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).send("An error occurred while searching for customers.");
    }
};
