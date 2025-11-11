'use client';

import { SignInContext } from '@/context/signInContext/signInContext';
import { useContext } from 'react';


export const useSignInContext = () => {
    return useContext(SignInContext);
};