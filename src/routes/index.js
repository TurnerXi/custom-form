import WorkFlow from '~/views/WorkFlow';
import WorkFlow2 from '~/views/WorkFlow2';
import WorkFlow3 from '~/views/WorkFlow3';
import FormBuilder from '~/views/FormBuilder';

export default [
    { path: '/', redirect: '/form' },
    { path: '/form', component: FormBuilder },
    { path: '/workflow', component: WorkFlow },
    { path: '/workflow2', component: WorkFlow2 },
    { path: '/workflow3', component: WorkFlow3 },
]