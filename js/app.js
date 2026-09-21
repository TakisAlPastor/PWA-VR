/* 
 * app.js
 * Lógica de interacción para la Prueba de Concepto de VR
 * Maneja el comportamiento de los Hotspots (puntos de interés) al ser mirados.
 */

// Registramos un componente personalizado de A-Frame llamado "hotspot-interaction"
AFRAME.registerComponent('hotspot-interaction', {
    init: function () {
        // 'this.el' hace referencia a la entidad (<a-entity>) que tiene este componente.
        let el = this.el;
        
        // Buscamos los elementos hijos: el disparador (la esfera) y el panel de información
        let trigger = el.querySelector('.clickable');
        let panel = el.querySelector('.info-panel');
        
        let isPanelVisible = false;

        // El cursor con fuse="true" emite un evento 'click' cuando el tiempo de mirada (timeout) se cumple.
        trigger.addEventListener('click', function () {
            if (!isPanelVisible) {
                // Emitir el evento 'show' que dispara la animación de escala en el panel
                panel.emit('show');
                
                // Opcional: Cambiar el color del hotspot para indicar que ya fue visitado
                trigger.setAttribute('color', '#4CAF50'); // Verde
                
                isPanelVisible = true;
            } else {
                // Si ya está visible, emitir el evento 'hide' para ocultarlo
                panel.emit('hide');
                isPanelVisible = false;
            }
        });

        // Animación visual adicional: hacer que el panel siga un poco la mirada o 
        // asegurar que se oculta si la persona se aleja mucho (opcional, por ahora lo mantenemos simple con toggle)
    }
});
