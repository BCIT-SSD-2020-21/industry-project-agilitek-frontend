/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import Navbar from '../../components/Navbar';
import UserForm from '../UserForm';

const navigation = ['Dashboard', 'Team', 'Projects', 'Calendar', 'Reports'];
const profile = ['Your Profile', 'Settings', 'Sign out'];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function MainPage() {
    return (
        <div>
            <main className="-mt-32">
                <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
                    {/* Replace with your content */}
                    <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
                        {/* <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"> */}
                        <UserForm />
                        {/* </div> */}
                    </div>
                    {/* /End replace */}
                </div>
            </main>
        </div>
    );
}
