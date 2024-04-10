const Validation = (data, type) => {

    const err = []

    const { firstName, lastName, email, password, ConfirmPassword, fullName, Address, mobile, pincode, city, roll
        , otp, title, Brand, alias, price, countInStock } = data

    if (type === "register") {

        // For FirstName 
        if (!firstName) {
            err.push({ key: "firstName", message: "Please Enter FirstName" })
        } else if (!(/^[a-zA-Z '.-]{2,10}$/.test(firstName))) {
            err.push({ key: "firstName", message: "Invalid firstName" })
        }


        // For LastName 
        if (!lastName) {
            err.push({ key: "lastName", message: "Please Enter lastName " })

        } else if (!(/^[a-zA-Z '.-]{2,10}$/.test(lastName))) {

            err.push({ key: "lastName", message: "Invalid lastName" })
        }

        // For Email
        if (!email) {
            err.push({ key: "email", message: "Please Enter email" })
        } // eslint-disable-next-line
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            err.push({ key: "email", message: "Inavalid Email" })
        }

        //For Password
        if (!password) {
            err.push({ key: "password", message: "Please Enter password" })
        }
        else if (!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password))) {
            err.push({ key: "password", message: "Password is To Weak Plaese Enter Strong Password " })
        }

        //For ConfromPassword
        if (!ConfirmPassword) {
            err.push({ key: "ConfirmPassword", message: "Requird To feild Confirm-Password" })
        }
        if (!(ConfirmPassword === password)) {
            err.push({ key: "ConfirmPassword", message: "Password Not Match" })
        }
    } else if (type === "adminproduct") {

        if (!title) {
            err.push({ key: "title", message: "Please Enter Title" })
        }

        if (!Brand) {
            err.push({ key: "Brand", message: "Please Enter Brand" })
        }

        if (!alias) {
            err.push({ key: "alias", message: "Please Enter Alias" })
        }

        if (!price) {
            err.push({ key: "price", message: "Please Enter Price" })
        } else if (!Number(price)) {
            err.push({ key: "price", message: "Please Enter Valid Value Of Price" })
        }

        if (!countInStock) {
            err.push({ key: "countInStock", message: "Please Enter countInStock" })
        } else if (!Number(countInStock)) {
            err.push({ key: "countInStock", message: "Please Enter Valid Value Of countInStock" })
        }
    } else if (type === "shipping") {

        //For FullName Error
        if (!fullName) {
            err.push({ key: "fullName", message: "Please Enter fullName" })
        } else if (!(/^[a-zA-Z '.-]{2,30}$/.test(fullName))) {
            err.push({ key: "fullName", message: "Invalid fullName" })
        }

        //For Address Error
        if (!Address) {
            err.push({ key: "Address", message: "Please Enter Address" })// eslint-disable-next-line
        } else if (!(/[A-Za-z'\.\-\s\,]{5,}$/.test(Address))) {
            err.push({ key: "Address", message: "Invalid Addresss" })
        }

        //For Mobile Number Error
        if (!mobile) {
            err.push({ key: "Mobile", message: "Please Enter Mobile Number" })
        } else if (!(/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile))) {
            err.push({ key: "Mobile", message: "Invalid Mobile Number " })
        }

        //For Mobile Number Error
        if (!pincode) {
            err.push({ key: "pincode", message: "Please Enter pincode Number" })
        } else if (!(/^(\d{4}|\d{6})$/.test(pincode))) {
            err.push({ key: "pincode", message: "Invalid pincode Number " })
        }

        // For Email
        if (!email) {
            err.push({ key: "email", message: "Please Enter email" })
        } // eslint-disable-next-line
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            err.push({ key: "email", message: "Inavalid Email" })
        }

        //For City Error
        if (!city) {
            err.push({ key: "City", message: "Please Enter City Name" })
        } else if (!(/^[a-zA-Z '.-]{2,10}$/.test(city))) {
            err.push({ key: "City", message: "Invalid City" })
        }

    } else if (type === "AdminUser") {

        //For FullName Error
        if (!fullName) {
            err.push({ key: "fullName", message: "Please Enter FullName" })
        } else if (!(/^[a-zA-Z '.-]{2,30}$/.test(fullName))) {
            err.push({ key: "fullName", message: "Invalid fullName" })
        }

        // For Email
        if (!email) {
            err.push({ key: "email", message: "Please Enter Email" })
        } // eslint-disable-next-line
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            err.push({ key: "email", message: "Inavalid Email" })
        }

        if (roll === "0") {
            err.push({ key: "roll", message: "Please Select One Option" })
        }

        //For Password
        if (!password) {
            err.push({ key: "password", message: "Please Enter Password" })
        }
        else if (!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password))) {
            err.push({ key: "password", message: "Password is To Weak Plaese Enter Strong Password " })
        }

    } else if (type === "otpverify") {
        // For Email
        if (!email) {
            err.push({ key: "email", message: "Please Enter email" })
        } // eslint-disable-next-line
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            err.push({ key: "email", message: "Inavalid Email" })
        }

        //For Password
        if (!password) {
            err.push({ key: "password", message: "Please Enter password" })
        }
        else if (!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password))) {
            err.push({ key: "password", message: "Password is To Weak Plaese Enter Strong Password " })
        }

        if (!otp) {
            err.push({ key: "otp", message: "Please Enter OTP" })
        } else if (otp.length < 6) {
            err.push({ key: "otp", message: "Invalid OTP" })
        }
    } else {
        // For Email
        if (!email) {
            err.push({ key: "email", message: "Please Enter email" })
        } // eslint-disable-next-line
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            err.push({ key: "email", message: "Inavalid Email" })
        }

        //For Password
        if (!password) {
            err.push({ key: "password", message: "Please Enter password" })
        }
        else if (!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password))) {
            err.push({ key: "password", message: "Password is To Weak Plaese Enter Strong Password " })
        }
    }

    return err
}

export default Validation