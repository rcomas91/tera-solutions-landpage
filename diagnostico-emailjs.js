// Script de diagnóstico para EmailJS
// Copia y pega esto en la consola del navegador (F12 > Console) en tu sitio web

console.log('🔍 Iniciando diagnóstico de EmailJS...');

// 1. Verificar que EmailJS esté cargado
if (typeof emailjs === 'undefined') {
    console.error('❌ EmailJS no está cargado. Verifica que el script se incluya correctamente en el HTML.');
} else {
    console.log('✅ EmailJS está cargado correctamente');
}

// 2. Verificar configuración
const serviceID = 'service_oje2bqx';
const templateID = 'template_c3mdljv';
const publicKey = 'jHNxtH2Vwq2nYItD3';

console.log('📋 Configuración actual:');
console.log('- Service ID:', serviceID);
console.log('- Template ID:', templateID);
console.log('- Public Key:', publicKey.substring(0, 8) + '...');

// 3. Probar inicialización
try {
    emailjs.init(publicKey);
    console.log('✅ EmailJS inicializado correctamente');
} catch (error) {
    console.error('❌ Error al inicializar EmailJS:', error);
}

// 4. Función de prueba
window.testEmailJSConnection = async function() {
    console.log('🚀 Probando envío de email...');

    const templateParams = {
        from_name: 'Diagnóstico Tera Solutions',
        from_email: 'diagnostico@example.com',
        company: 'Empresa de Prueba',
        service: 'Diagnóstico',
        message: 'Este es un email de diagnóstico para verificar la configuración de EmailJS.',
        to_email: 'raydelcomas1991@gmail.com'
    };

    try {
        const response = await emailjs.send(serviceID, templateID, templateParams);
        console.log('✅ ¡Email enviado exitosamente!', response);
        alert('✅ Email enviado correctamente. Revisa tu bandeja de entrada.');
    } catch (error) {
        console.error('❌ Error al enviar email:', error);
        alert('❌ Error: ' + (error.text || error.message || 'Error desconocido'));
    }
};

// 5. Instrucciones
console.log('📝 Para probar la conexión, ejecuta: testEmailJSConnection()');
console.log('💡 Si hay errores, revisa:');
console.log('   - Que los IDs de EmailJS sean correctos');
console.log('   - Que el template esté configurado con las variables correctas');
console.log('   - Que tu cuenta de EmailJS esté verificada');