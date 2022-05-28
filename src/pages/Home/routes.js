//pages
import Main from '../../pages/Main';
import Book from '../../pages/Book';
import Member from '../../pages/Member';
import LogCirculation from '../../pages/LogCirculation';
import DetailMember from '../../pages/DetailMember';
import DetailOperator from '../../pages/DetailOperator';
import EditMember from '../../pages/EditMember';
import EditOperator from '../../pages/EditOperator';
import EditAdmin from '../../pages/EditAdmin';
import EditPassword from '../../pages/EditPassword';
import Operator from '../../pages/Operator';
import Admin from '../../pages/Admin';
import Booking from '../../pages/Booking';
import Circulation from '../../pages/Circulation';
import ReportCirculation from '../../pages/ReportCirculation';

 const routes = [
	{path: '/', exact: true, Component: Main},
	{path: '/circulation-log', Component: LogCirculation, role:['admin','operator']},
	{path: '/circulation/report', Component: ReportCirculation},
	{path: '/circulation', Component: Circulation},
	{path: '/booking', Component: Booking},
	{path: '/book', Component: Book, role:['admin','operator']},
	{path: '/member/:user_id/password', Component: EditPassword},
	{path: '/member/:member_id/edit', Component: EditMember},
	{path: '/member/:member_id', Component: DetailMember},
	{path: '/member', Component: Member, role:['admin','operator']},
	{path: '/user/admin/:admin_id/edit', Component: EditAdmin, role:['admin']},
	{path: '/user/admin', Component: Admin, role:['admin']},
	{path: '/user/operator/:user_id/password', Component: EditPassword, role:['admin','operator']},
	{path: '/user/operator/:operator_id/edit', Component: EditOperator, role:['admin','operator']},
	{path: '/user/operator/:operator_id', Component: DetailOperator, role:['admin','operator']},
	{path: '/user/operator', Component: Operator, role:['admin','operator']}
]

export default routes