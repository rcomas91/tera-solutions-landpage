// Tipos básicos
// Clase principal
class TeraSolutionsApp {
    constructor() {
        this.contactForm = document.getElementById('contactForm');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.init();
    }
    init() {
        this.setupEventListeners();
        this.setupScrollEffects();
    }
    setupEventListeners() {
        // Menú móvil
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggleMobileMenu());
        }
        // Formulario de contacto
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }
        // Navegación suave
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => this.handleSmoothScroll(e));
        });
        // Scroll para header
        window.addEventListener('scroll', () => this.handleScroll());
    }
    toggleMobileMenu() {
        if (this.navMenu) {
            this.navMenu.classList.toggle('active');
            this.hamburger?.classList.toggle('active');
        }
    }
    handleSmoothScroll(e) {
        e.preventDefault();
        const target = e.target;
        const targetId = target.getAttribute('href');
        if (targetId && targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = 70;
                const targetPosition = targetElement.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    }
    handleScroll() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            }
            else {
                header.classList.remove('scrolled');
            }
        }
    }
    setupScrollEffects() {
        // Efecto parallax para hero
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }
    async handleFormSubmit(e) {
        e.preventDefault();
        if (!this.contactForm)
            return;
        const formData = new FormData(this.contactForm);
        const contactData = {
            name: formData.get('name'),
            email: formData.get('email'),
            company: formData.get('company'),
            service: formData.get('service'),
            message: formData.get('message')
        };
        const validation = this.validateForm(contactData);
        if (validation.isValid) {
            await this.submitForm(contactData);
        }
        else {
            this.showErrors(validation.errors);
        }
    }
    validateForm(data) {
        const errors = [];
        if (!data.name.trim()) {
            errors.push('El nombre es requerido');
        }
        if (!data.email.trim()) {
            errors.push('El email es requerido');
        }
        else if (!this.isValidEmail(data.email)) {
            errors.push('El email no es válido');
        }
        if (!data.service) {
            errors.push('Por favor selecciona un servicio');
        }
        if (!data.message.trim()) {
            errors.push('El mensaje es requerido');
        }
        return {
            isValid: errors.length === 0,
            errors
        };
    }
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    async submitForm(data) {
        const submitButton = this.contactForm?.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        try {
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            // Simular envío
            await new Promise(resolve => setTimeout(resolve, 2000));
            // Enviar email
            await this.sendEmail(data);
            this.showSuccess('¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.');
            this.contactForm?.reset();
        }
        catch (error) {
            this.showError('Hubo un error al enviar el mensaje. Por favor intenta nuevamente.');
            console.error('Error submitting form:', error);
        }
        finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }
    async sendEmail(data) {
        // Simular envío de email
        const emailData = {
            to: 'raydelcomas1991@gmail.com',
            subject: `Nueva consulta de ${data.name} - ${data.company}`,
            body: `
                Nombre: ${data.name}
                Email: ${data.email}
                Empresa: ${data.company}
                Servicio: ${data.service}
                Mensaje: ${data.message}
            `
        };
        console.log('Email data:', emailData);
        return Promise.resolve();
    }
    showSuccess(message) {
        this.showNotification(message, 'success');
    }
    showError(message) {
        this.showNotification(message, 'error');
    }
    showErrors(errors) {
        errors.forEach(error => this.showNotification(error, 'error'));
    }
    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            backgroundColor: type === 'success' ? '#10b981' : '#ef4444'
        });
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
}
// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new TeraSolutionsApp();
});
