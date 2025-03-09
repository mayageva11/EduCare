import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Form from '@/models/Form';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { studentId, formType } = body;

    if (!studentId || !formType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get form name based on form type
    let formName = '';
    switch (formType) {
      case 'functional_report':
        formName = 'דו״ח תפקוד';
        break;
      case 'meeting_summary':
        formName = 'סיכום פגישה';
        break;
      case 'teacher_questionnaire':
        formName = 'שאלון מחנכת';
        break;
      case 'confidentiality_waiver':
        formName = 'ויתור סודיות';
        break;
      case 'parent_consent':
        formName = 'טופס הסכמת הורים להיבחנות מותאמת';
        break;
      default:
        formName = 'טופס חדש';
    }

    // Create a new form
    const newForm = await Form.create({
      formType,
      name: formName,
      studentId,
      editable: true
    });

    return NextResponse.json(newForm, { status: 201 });
  } catch (error) {
    console.error('Error adding form:', error);
    return NextResponse.json({ error: 'Failed to add form' }, { status: 500 });
  }
}
