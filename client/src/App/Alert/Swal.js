// utils/Alert.js
import Swal from 'sweetalert2';

class Alert {
    static theme = null;

    /**
     * Initialize Alert with MUI theme
     * @param {Object} muiTheme - MUI theme object
     */
    static init(muiTheme) {
        this.theme = muiTheme;

        // Configure SweetAlert2 with theme
        Swal.mixin({
            customClass: {
                confirmButton: 'MuiButton-root MuiButton-contained',
                cancelButton: 'MuiButton-root MuiButton-outlined',
                popup: 'swal2-popup-custom',
            },
            buttonsStyling: false,
        });
    }

    /**
     * Get theme colors for SweetAlert
     * @private
     */
    static getThemeColors() {
        if (!this.theme) {
            return {
                primary: '#1976d2',
                error: '#d32f2f',
                warning: '#ed6c02',
                success: '#2e7d32',
                info: '#0288d1',
            };
        }

        return {
            primary: this.theme.palette.primary.main,
            error: this.theme.palette.error.main,
            warning: this.theme.palette.warning.main,
            success: this.theme.palette.success.main,
            info: this.theme.palette.info.main,
            background: this.theme.palette.background.paper,
            text: this.theme.palette.text.primary,
        };
    }

    /**
     * Show a confirmation dialog
     * @param {string} title - Alert title
     * @param {string} text - Alert message
     * @param {string} confirmText - Confirm button text
     * @param {string} cancelText - Cancel button text
     * @returns {Promise<boolean>} - Returns true if confirmed, false if cancelled
     */
    static async confirm(title, text = '', confirmText = 'Yes', cancelText = 'Cancel') {
        const colors = this.getThemeColors();

        const result = await Swal.fire({
            title,
            text,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: confirmText,
            cancelButtonText: cancelText,
            confirmButtonColor: colors.primary,
            cancelButtonColor: colors.error,
            reverseButtons: true,
            background: colors.background,
            color: colors.text,
            backdrop: `rgba(0, 0, 0, 0.4)`,
            customClass: {
                container: 'swal-container',
                popup: 'swal-popup',
                title: 'swal-title',
                htmlContainer: 'swal-html',
                confirmButton: 'swal-confirm-btn',
                cancelButton: 'swal-cancel-btn',
            },
        });

        return result.isConfirmed; // returns true or false
    }

    /**
     * Show a delete confirmation dialog
     * @param {string} itemName - Name of item being deleted
     * @param {string} message - Additional message
     * @returns {Promise<boolean>} - Returns true if confirmed, false if cancelled
     */
    static async delete(itemName = 'this item', message = 'This action cannot be undone.') {
        const colors = this.getThemeColors();

        return this.confirm(
            `Delete ${itemName}?`,
            `Are you sure you want to delete ${itemName}? ${message}`,
            'Yes, delete it!',
            'Cancel'
        );
    }

    /**
     * Show a success message
     * @param {string} title - Alert title
     * @param {string} text - Alert message
     * @param {number} timer - Auto close timer in ms (0 for no auto close)
     */
    static success(title, text = '', timer = 3000) {
        const colors = this.getThemeColors();

        const config = {
            title,
            text,
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: colors.success,
            background: colors.background,
            color: colors.text,
        };

        if (timer > 0) {
            config.timer = timer;
            config.timerProgressBar = true;
            config.showConfirmButton = false;
        }

        Swal.fire(config);
    }

    /**
     * Show an error message
     * @param {string} title - Alert title
     * @param {string} text - Alert message
     */
    static error(title, text = '') {
        const colors = this.getThemeColors();

        Swal.fire({
            title,
            text,
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: colors.error,
            background: colors.background,
            color: colors.text,
        });
    }

    /**
     * Show a warning message
     * @param {string} title - Alert title
     * @param {string} text - Alert message
     */
    static warning(title, text = '') {
        const colors = this.getThemeColors();

        Swal.fire({
            title,
            text,
            icon: 'warning',
            confirmButtonText: 'OK',
            confirmButtonColor: colors.warning,
            background: colors.background,
            color: colors.text,
        });
    }

    /**
     * Show an info message
     * @param {string} title - Alert title
     * @param {string} text - Alert message
     */
    static info(title, text = '') {
        const colors = this.getThemeColors();

        Swal.fire({
            title,
            text,
            icon: 'info',
            confirmButtonText: 'OK',
            confirmButtonColor: colors.info,
            background: colors.background,
            color: colors.text,
        });
    }

    /**
     * Show a prompt dialog
     * @param {string} title - Prompt title
     * @param {string} text - Prompt message
     * @param {string} inputType - Input type (text, textarea, email, password, etc.)
     * @param {string} defaultValue - Default value
     * @param {Function} validator - Custom validation function
     * @returns {Promise<string|null>} - Returns input value or null if cancelled
     */
    static async prompt(title, text = '', inputType = 'text', defaultValue = '', validator = null) {
        const colors = this.getThemeColors();

        const config = {
            title,
            text,
            input: inputType,
            inputValue: defaultValue,
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            confirmButtonColor: colors.primary,
            cancelButtonColor: colors.error,
            background: colors.background,
            color: colors.text,
            inputValidator: validator || ((value) => {
                if (!value) {
                    return 'Please enter a value';
                }
                return null;
            }),
        };

        const result = await Swal.fire(config);

        return result.isConfirmed ? result.value : null;
    }

    /**
     * Show a toast notification
     * @param {string} title - Toast title
     * @param {string} icon - success, error, warning, info, question
     * @param {number} timer - Duration in ms
     */
    static toast(title, icon = 'success', timer = 3000) {
        const colors = this.getThemeColors();

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer,
            timerProgressBar: true,
            background: colors.background,
            color: colors.text,
            customClass: {
                popup: 'swal-toast',
            },
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
        });

        Toast.fire({
            icon,
            title,
        });
    }
}

export default Alert;