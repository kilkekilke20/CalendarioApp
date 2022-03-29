// es basicamente lo mismo que el de Evento.js pero con alguna que otra modificacion
const { Schema, model } = require('mongoose');

//la tabla de evento(una vez que se lanza mongodb crea la tabla automaticamente)
const EventoSchema = Schema({
    //hay que  ponerlo en ingles ya que la api del calendario trabaja en ingles (pese a que lo traduci es mejor ir a lo seguro)



    title: {
        type: String,
        required: true
    },

    notes: {
        type: String
    },

    start: {
        type: Date,
        required: true
    },

    end: {
        type: Date,
        required: true
    },

    //el usuario que creo el evento
    user: {
        // esto le dice a mongoose que va a ser una referencia
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

});

//al hacer la llamada al JSON aparece dos cosas, la version(__v) y la id en formato _id, la version no me interesa y el _id para no confundirme con la de usuario la llamare id
// este metodo lo recogi de los foros y del mongoose
// SOLO AFECTA AL JSON no a la base de datos
EventoSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

//lo siguiente hara que se exporte el EventoSchema con el nombre Evento a la base de datos, por lo que alli saldra Eventos, siempre en plural
module.exports = model('Evento', EventoSchema);