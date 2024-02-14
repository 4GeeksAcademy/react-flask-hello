import React from 'react';

import { UserInsertData } from '../component/userInsertData';
import { TimeCounter } from '../component/timeCounter';

export const Userinsertdata = () => {

    return (
        <>
            <div className="text-center mt-6">
                <TimeCounter />
                <UserInsertData />
            </div>
        </>

    )
}