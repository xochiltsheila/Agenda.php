<div class="campos">
            <div class="campo">
                 <label for="nombre">Nombre:</label>
                <input type="text" 
                placeholder="Nombre Contacto" 
                id="nombre"
                value="<?php echo ($contacto['nombre']) ? $contacto['nombre'] : ''; ?>"
            >
            </div>
            <div class="campo">
                <label for="nombre">Empresa:</label>
                <input type="text" 
                placeholder="Nombre Empresa" 
                id="empresa"
                value="<?php echo ($contacto['empresa']) ? $contacto['empresa'] : ''; ?>"
                >
             </div>
             <div class="campo">
                <label for="telefono">Teléfono:</label>
                <input type="tel" 
                placeholder="Teléfono Contacto"
                 id="telefono"
                 value="<?php echo ($contacto['telefono']) ? $contacto['telefono'] : ''; ?>"
                 >
             </div>

            </div>
             <div class="campo enviar">
                 <input type="hidden" id="accion" value="crear">
                <input type="submit" value="Añadir">
            </div>