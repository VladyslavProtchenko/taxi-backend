export const  emailTemplate =(name, dateTime,id) =>{

    return (
        `
        <div style='background-color: white; width: 100%; height: 100%;  '>
            <div style='  border:1px solid black; padding: 24px; margin: 0 auto; '>
                <h1 style="font-size: 24px;">hi, ${name}</h1>
                <div style=''>You have ordered taxi at ${dateTime}</div>
                <div style='display:flex; padding: 10px 0px; align-items:start;'>
                    <a href='http://localhost:5173/confirm/${id}' style='background-color: green; padding: 4px 12px; margin-right:8px; color: white; cursor: pointer; border-radius: 10px; text-decoration:none;'>Confirm</a>
                    <a href='http://localhost:5173/editOrder/${id}' style='background-color: orange; padding: 4px 12px; margin-right:8px; color: white; cursor: pointer; border-radius: 10px; text-decoration:none;'>Modify</a>
                    <a href='http://localhost:5173/cancel/${id}' style='background-color: red; padding: 4px 12px; margin-right:8px; color: white; cursor: pointer; border-radius: 10px; text-decoration:none;'>Cancel</a>
                    <a href='http://localhost:5173/pending/${id}' style='background-color: yellow; padding: 4px 12px; margin-right:8px; color: white; cursor: pointer; border-radius: 10px; text-decoration:none;'>Hold</a>
                </div>
            </div>
        </div>
        `
    )
} 