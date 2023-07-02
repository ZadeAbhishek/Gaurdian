let variable = {
    userName: null,
    passWord: null,
    email: null,
    phone: null,
    authenitcated: false,

    validateText(type, string) {
        //Javascript reGex for Email Validation.
        var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
        // Javascript reGex for Phone Number validation.
        var regPhone = /^\d{10}$/;
        // Javascript reGex for Name validation
        var regName = /\d+$/g;
        //To check a password between 6 to 20 characters which contain at least one numeric digit, one
        var regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

        if (type === 'password' && (string == "" || !regPassword.test(string))) return false;
        if (type === 'name' && (string == "" || regName.test(string))) return false;
        if (type === 'email' && (string == "" || !regEmail.test(string))) return false;
        if (type === 'phone' && (string == "" || !regPhone.test(string))) return false;

        return true;
    },

    setlocalStorage(key, value) {
        localStorage.setItem(key, value);
        return true;
    },
    getlocalStorage(key) {
        return localStorage.getItem(key);
    },
    clearlocalStorage() {
        localStorage.clear();
        window.location.reload();
    }

}

export default function Variable() {
    return variable;
};