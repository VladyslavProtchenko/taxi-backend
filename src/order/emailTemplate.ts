export const  emailTemplate =(name, dateTime,id) =>{

    return (
        `
        <div style=' background-color: #e9eef0; width: 100%; padding-top: 20px; justify-content:center; padding-bottom: 50px; display: flex;  '>
            <div style=' padding: 18px; align-text: center; margin: 0px auto; border-radius: 20px; background-color: white; '>
                <h1 style="font-size: 18px; text-align:center;">Bonjour TAXI</h1>

                <h2 style="font-size: 18px; margin:8px 0 24px 0;  ">Welcome, ${name}</h2>
                <div style='padding-left: 10px; margin-bottom: 16px;'>You have ordered taxi at ${dateTime}</div>
                <div style='display:flex; padding: 10px 0px; align-items:start;'>
                    <a href='https://taxi-dashboard-seven.vercel.app/confirm/${id}' style='padding: 8px 24px; margin-right: 8px; color: #2e2e2e;background: #5dff75; border-radius: 20px; text-decoration: none; '>CONFIRM</a>
                    <a href='https://taxi-dashboard-seven.vercel.app/editOrder/${id}' style='padding: 8px 24px;margin-right: 8px; color: white; background: #a160ff; border-radius: 20px; text-decoration: none; '>MODIFY</a>
                    <a href='https://taxi-dashboard-seven.vercel.app/cancel/${id}' style='padding: 8px 24px;margin-right: 8px;color: white; background: #ff1e8d; border-radius: 20px; text-decoration: none; '>DECLINE</a>
                    <a href='https://taxi-dashboard-seven.vercel.app/pending/${id}' style='padding: 8px 24px;margin-right: 8px;color: white; background: #2563ff; border-radius: 20px; text-decoration: none; '>HOLD</a>
                </div>
            </div>
        </div>
        `
    )
} 