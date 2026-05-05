function TaskForm() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('TaskForm submitted — not yet wired up.');
    };

    return (
        <div style={{
            border: '1px solid lightgray',
            borderRadius: '6px',
            padding: '16px',
            marginBottom: '24px',
            backgroundColor: 'whitesmoke',
        }}>
            <h2 style={{ marginTop: 0 }}>Add Task</h2>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="title" style={{ display: 'block', marginBottom: '4px' }}>
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Task title"
                        style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid lightgray', boxSizing: 'border-box' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="description" style={{ display: 'block', marginBottom: '4px' }}>
                        Description
                    </label>
                    <textarea
                        id="description"
                        placeholder="Optional description"
                        rows={2}
                        style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid lightgray', boxSizing: 'border-box' }}
                    />
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label htmlFor="priority" style={{ display: 'block', marginBottom: '4px' }}>
                        Priority
                    </label>
                    <select
                        id="priority"
                        style={{ padding: '6px', borderRadius: '4px', border: '1px solid lightgray' }}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <button
                    type="submit"
                    style={{
                        padding: '8px 20px',
                        backgroundColor: 'steelblue',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    Add Task
                </button>
            </form>
        </div>
    );
}

export default TaskForm;