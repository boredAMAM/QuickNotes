from flask import Flask, request, jsonify
from datetime import datetime

app = Flask(__name__)

notes = []

@app.route('/notes', methods=['GET'])
def get_notes():
    tag = request.args.get('tag', None)
    search_query = request.args.get('query', None)
    filtered_notes = notes
    
    if tag:
        filtered_notes = [note for note in filtered_notes if tag in note.get('tags', [])]

    if search_query:
        filtered_notes = [note for note in filtered_notes if search_query.lower() in note.get('text', '').lower()]
    
    return jsonify(filtered_notes)

@app.route('/notes', methods=['POST'])
def add_note():
    note = request.json
    note['created_at'] = datetime.now().isoformat()
    note['modified_at'] = datetime.now().isoformat()
    notes.append(note)
    return jsonify(note), 201

@app.route('/notes/<int:note_id>', methods=['GET'])
def get_note(note_id):
    note = next((note for note in notes if note['id'] == note_id), None)
    if note:
        return jsonify(note)
    else:
        return jsonify({"error": "Note not found"}), 404

@app.route('/notes/<int:note_id>', methods=['PUT'])
def update_note(note_id):
    note = next((note for note in notes if note['id'] == note_id), None)
    if note:
        update_data = request.json
        note.update(update_data)
        note['modified_at'] = datetime.now().isoformat()  # Update modification time
        return jsonify(note)
    else:
        return jsonify({"error": "Note not found"}), 404

@app.route('/notes/<int:note_id>', methods=['DELETE'])
def delete_note(note_id):
    global notes
    notes = [note for note in notes if note['id'] != note_id]
    return jsonify({"message": "Note deleted"}), 204

if __name__ == '__main__':
    app.run(port=5000)