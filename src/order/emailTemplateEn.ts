export const  emailTemplateEn =(name, dateTime, id, dateTimeR? ) =>{
    
    const row = dateTimeR ?  `<div style='padding-left: 10px; margin-bottom: 16px;'>Return trip at ${dateTimeR}</div>` :""

    return (
        `
        <div style=' background-color: #e9eef0; width: 100%; padding-top: 20px; justify-content:center; padding-bottom: 50px; display: flex;  '>
            <div style=' padding: 18px; align-text: center; margin: 0px auto; border-radius: 20px; background-color: white; '>
                <h1 style="font-size: 18px; text-align:center;">Bonjour TAXI</h1>

                <div style=" width: 100%; display: flex; margin-bottom: 40px;">
                    <div style="font-size: 18px; display:flex;  margin:8px auto 0px 0; ">Welcome, ${name}</div>
                    <a href='https://taxi-dashboard-seven.vercel.app/editOrder/${id}' style='padding: 8px 24px;  color: white;  background: #2563ff; border-radius: 20px; text-decoration: none; '>edit</a>
                </div>    
                <div style='padding-left: 10px; margin-bottom: 16px;'>You have ordered taxi at ${dateTime}</div>
                ${row}
                <div style='display:flex; padding: 10px 0px; align-items:start;'>
                    <a href='https://taxi-dashboard-seven.vercel.app/confirm/${id}' style='padding: 8px 24px; margin-right: 8px; color: white;background: #1cde63; border-radius: 20px; text-decoration: none; '>CONFIRM</a>
                    <a href='https://taxi-dashboard-seven.vercel.app/pending/${id}' style='padding: 8px 24px;margin-right: 8px;color: white; background: #ff6200; border-radius: 20px; text-decoration: none; '>HOLD</a>
                    <a href='https://taxi-dashboard-seven.vercel.app/cancel/${id}' style='padding: 8px 24px;margin-right: 8px;color: white; background: #ff1e2d; border-radius: 20px; text-decoration: none; '>DECLINE</a>
                </div>
            </div>
        </div>
        `
    )
} 